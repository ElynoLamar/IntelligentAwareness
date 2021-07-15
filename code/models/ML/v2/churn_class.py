import pandas as pd
import matplotlib.pyplot as plt
import numpy as np
import tensorflow as tf
import os
import sys


#Reading the model from JSON file
with open(os.path.join(sys.path[0], "churn_model.json"), 'r') as json_file:
    json_savedModel= json_file.read()
#load the model architecture 
model = tf.keras.models.model_from_json(json_savedModel)
model.summary()
model.load_weights(os.path.join(sys.path[0],'churn_weights.h5'))
#CHURN E BUSY
#[12,7,4,1,1.61,132,6,1,0,10,5,3,1,3.82,265,6,1,0]
#churn active
#[12,6,2,2,5.37,404,3,2,0,10,6,3,2,3.65,168,3,2,0]
#no churn busy
#[12,8,2,5,5.31,574,4,2,0,10,7,2,4,3.87,616,3,2,0]
#no churn active
#[12,12,3,8,3.38,778,2,2,0,10,10,1,7,4.94,773,2,2,0]
#prediction
logits = model(np.array([[12,12,3,8,3.38,778,2,2,0,10,5,3,1,3.82,265,6,1,0]]),training=False)
#prediction comes in an array of probabilities of each profile
print(logits)
#we print the highest probability 
print(np.argmax(logits,axis=1))