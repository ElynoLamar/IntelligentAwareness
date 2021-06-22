import pandas as pd
import matplotlib.pyplot as plt
import numpy as np
import tensorflow as tf
from keras.utils import to_categorical
import tensorflowjs as tfjs

churn_dataset_fp = "ML/dataset.data"

#train_dataset_url = "https://archive.ics.uci.edu/ml/machine-learning-databases/iris/iris.data"
#train_dataset_fp = tf.keras.utils.get_file(fname=os.path.basename(train_dataset_url),corigin=train_dataset_url)
#print("Local copy of the dataset file: {}".format(train_dataset_fp))

# column order in CSV file
column_names = ['PW-Available-Tasks','PW-Accepted-Tasks','PW-Canceled-Tasks','PW-Concluded-Tasks','PW-Times-Acessed-Platform',	'PW-Time-spent-online',	'PW-avg-days-conclude-Task',	'leader-previous-week',	'PW-leader-task-Concluded',	'TW-Available-Tasks',	'TW-Accepted-Tasks',	'TW-Canceled-Task',	'TW-Concluded-Task',	'TW-Times-Acessed-Platform','TW-Time-spent-online',	'TW-avg-days-to-conclude-Task',	'TW-leader-previous-week','TW-leader-task-Concluded','Profile'] 

feature_names = column_names[:-1]
label_name = column_names[-1]

#print("Features: {}".format(feature_names))
#print("Label: {}".format(label_name))

class_names = ['Churn-Busy','Churn-Active','NoChurn-Busy','NoChurn-Active']

churn_dataset = pd.read_csv(
    churn_dataset_fp,
    names=column_names)

#shuffle the data
churn_dataset=churn_dataset.iloc[np.random.permutation(len(churn_dataset))]
#Index reorganizado
churn_dataset=churn_dataset.reset_index(drop=True)

print(churn_dataset.head())


model = tf.keras.Sequential([
    tf.keras.layers.Dense(18,activation=tf.nn.relu, input_shape=(18,)),  # input shape require
    tf.keras.layers.Dense(4, activation=tf.nn.softmax)
])

model.compile(
    # Optimizer    
    optimizer=tf.keras.optimizers.Adam(learning_rate=0.04), 
    # Loss function to minimize
    loss=tf.keras.losses.CategoricalCrossentropy(),
    # List of metrics to monitor
    metrics=[tf.keras.metrics.CategoricalAccuracy()]
)   

print("---------------")

#Convert categorical label to integers
#iris_dataset[label_name] = iris_dataset[label_name].map({1:(1,1),2:(1,0),3:(0,1),4:(0,0)})
churn_dataset[label_name] = churn_dataset[label_name].map({1:0,2:1,3:2,4:3})
#churn_dataset[label_name] = churn_dataset[label_name].map({1:1,2:2,3:3,4:4})
labels= churn_dataset[label_name].to_numpy()
labels = to_categorical(labels)
temp = churn_dataset.drop(columns='Profile')
print(temp)
#features = iris_dataset.copy().to_numpy()
#labels = features.pop(label_name)
features=temp.to_numpy()
print(type(labels))
print(type(features))
print(labels.shape)

print(features.shape)
history = model.fit(features, labels, epochs=20, validation_split = 0.2)
print(history)

#tf.keras.utils.plot_model(model = model , rankdir="LR", dpi=72, show_shapes=True)
logits = model(np.array([[11,5,4,0,1.75,183,6,1,0,11,6,4,1,0.53,51,5,1,0]]),training=False)
print(logits)

# serialize model to json
json_model = model.to_json()
#save the model architecture to JSON file
with open('ML/v2/churn_model.json', 'w') as json_file:
    json_file.write(json_model)
#saving the weights of the model
model.save_weights('ML/v2/churn_weights.h5')

tfjs.converters.save_keras_model(model, "ML/v2/tfjsmodel")


