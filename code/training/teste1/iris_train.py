import pandas as pd
import matplotlib.pyplot as plt
import numpy as np
import tensorflow as tf

from numpy.random import seed
seed(1)
tf.random.set_seed(2)

iris_dataset_fp = "training/teste1/dataset.data"
#train_dataset_url = "https://archive.ics.uci.edu/ml/machine-learning-databases/iris/iris.data"
#train_dataset_fp = tf.keras.utils.get_file(fname=os.path.basename(train_dataset_url),corigin=train_dataset_url)
#print("Local copy of the dataset file: {}".format(train_dataset_fp))

# column order in CSV file
column_names = ['PW-Available-Tasks','PW-Accepted-Tasks','PW-Canceled-Tasks','PW-Concluded-Tasks','PW-Times-Acessed-Platform',	'PW-Time-spent-online',	'PW-avg-days-conclude-Task',	'leader-previous-week',	'PW-leader-task-Concluded',	'TW-Available-Tasks',	'TW-Accepted-Tasks',	'TW-Canceled-Task',	'TW-Concluded-Task',	'TW-Times-Acessed-Platform',	'TW-Time-spent-online',	'TW-avg-days-to-conclude-Task',	'TW-leader-previous-week'	,'TW-leader-task-Concluded','Profile'] 


feature_names = column_names[:-1]
label_name = column_names[-1]

print("Features: {}".format(feature_names))

print("Label: {}".format(label_name))

class_names = ['Churn-Busy','Churn-Active','NoChurn-Busy','NoChurn-Active']

iris_dataset = pd.read_csv(
    iris_dataset_fp,
    names=column_names)

iris_dataset.head()

model = tf.keras.Sequential([
    tf.keras.layers.Dense(10, activation=tf.nn.relu, input_shape=(18,)),  # input shape required
    tf.keras.layers.Dense(4)
])

model.compile(
    optimizer=tf.keras.optimizers.SGD(learning_rate=0.01),  # Optimizer
    # Loss function to minimize
    loss=tf.keras.losses.MeanSquaredError(),
    # List of metrics to monitor
  #  metrics=[tf.keras.metrics.CategoricalAccuracy()],
    metrics=[tf.keras.metrics.SparseCategoricalAccuracy()],
)

#Convert categorical label to integers
#iris_dataset[label_name] = iris_dataset[label_name].map(
#    {"Iris-setosa":(1,0,0),"Iris-virginica":(0,1,0),"Iris-versicolor":(0,0,1)})
iris_dataset[label_name] = iris_dataset[label_name].map(
    {"1":0,"2":1,"3":2,"4":3})
    
features = iris_dataset.copy()
labels = features.pop(label_name)

print(features)
history = model.fit(features, labels, epochs=20)

print(history)

#tf.keras.utils.plot_model(model = model , rankdir="LR", dpi=72, show_shapes=True)

logits = model(np.array([[11,5,4,0,1.75,183,6,1,0,11,6,4,1,0.53,51,5,1,0]]),training=False)
print(logits)

# serialize model to json
json_model = model.to_json()
#save the model architecture to JSON file
with open('iris_model.json', 'w') as json_file:
    json_file.write(json_model)
#saving the weights of the model
model.save_weights('training/teste1/iris_weights.h5')

