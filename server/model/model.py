import torch
import os
import cv2
import pytesseract
import re

class Model:
    def __init__(self, dirModels: str, modelLP: str, modelCar: str, tesseractPath) -> None:
        pytesseract.pytesseract.tesseract_cmd = tesseractPath

        self.modelLP = torch.hub.load('ultralytics/yolov5', 'custom', path=dirModels + modelLP, force_reload=True)
        self.modelLP.conf = 0.5
    
        self.dirModels = dirModels

    def predict(self, img):
        licensePlate = ""
        resultsLicenses = self.modelLP(img, augment=True)
        df = resultsLicenses.pandas().xyxy[0]
        cordinatesLicense = df[["xmin","xmax","ymin","ymax"]].values.astype(int)
        
        for c in cordinatesLicense:
            xmin,xmax,ymin,ymax = c
            image = cv2.imread(img)
            imageGray = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)  
            centerX = (xmin + xmax)//2
            if centerX < image.shape[1] * 0.6 and centerX > image.shape[1] * 0.4: 
                imageCrop =  imageGray[ymin:ymax,xmin:xmax]
                licensePlate = pytesseract.image_to_string(imageCrop, config ='--oem 3 --psm 6 -c tessedit_char_whitelist=ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789')
                licensePlate = licensePlate.replace(" ","")
                LpMatch = re.match(r'\d{4}[A-Z]{3}', licensePlate)
                if LpMatch:
                    licensePlate = LpMatch.group(0)
                    cv2.imwrite("../data/" + licensePlate + "-Crop" + ".jpg", imageCrop)
                    license = cv2.rectangle(image, (xmin, ymin), (xmax, ymax), (0,0,255), 3)
                    license = cv2.putText(license, "licensePlate", (xmin, int(ymin*0.98)), cv2.FONT_ITALIC, 1, (0,0,255), 1)
                    cv2.imwrite("../data/" + licensePlate + ".jpg", license)
        return licensePlate

if __name__ == '__main__':
    os.chdir("server/model/")
    dirModels = "../../models/"  
    model = Model(dirModels, "LPModelParking2.pt", "carFineTuned.pt", "C:/Program Files/Tesseract-OCR/tesseract.exe")

    img ="../data/"
    # Get all elements in the path with the full path and extension and check if it is a file
    for file in os.listdir(img):
        if file.endswith(".jpg"):
            image = img + file
            licensePlates = model.predict(image)
            print(licensePlates)
    