import pandas as pd
import matplotlib.pyplot as plt
import numpy as np
import tensorflow as tf

#Reading the model from JSON file
with open('ML/v2/churn_model.json', 'r') as json_file:
    json_savedModel= json_file.read()
#load the model architecture 
model = tf.keras.models.model_from_json(json_savedModel)
model.summary()

model.load_weights('ML/v2/churn_weights.h5')

logits = model(np.array([[11,5,4,0,1.75,183,6,1,0,11,6,4,1,0.53,51,5,1,0]]),training=False)
print(logits)