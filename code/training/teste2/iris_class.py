import pandas as pd
import matplotlib.pyplot as plt
import numpy as np
import tensorflow as tf

#Reading the model from JSON file
with open('iris_model.json', 'r') as json_file:
    json_savedModel= json_file.read()
#load the model architecture 
model = tf.keras.models.model_from_json(json_savedModel)
model.summary()

model.load_weights('training/teste2/iris_weights.h5')

logits = model(np.array([[5.9, 3.0,	4.3, 1.5]]),training=False)
print(logits)
