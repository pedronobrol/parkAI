# Model Description

LPModelKaggle was trained using the public dataset from kaggle with the first 10 layers frozen

LPModelParking1 was trained with transfer learning using LPModelKaggle model as pretrained weights with the first 10 layers frozen

LPModelParking2 was trained was retrained using LPModelParking1 as pretrained weights but with no frozen layers