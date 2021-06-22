import pandas as pd
import matplotlib.pyplot as plt
import numpy as np
import tensorflow as tf


iris_dataset_fp = "training/teste2/iris.data"
#train_dataset_url = "https://archive.ics.uci.edu/ml/machine-learning-databases/iris/iris.data"
#train_dataset_fp = tf.keras.utils.get_file(fname=os.path.basename(train_dataset_url),corigin=train_dataset_url)
#print("Local copy of the dataset file: {}".format(train_dataset_fp))

# column order in CSV file
column_names = ['sepal_length', 'sepal_width', 'petal_length', 'petal_width', 'species']

feature_names = column_names[:-1]
label_name = column_names[-1]

print("Features: {}".format(feature_names))
print("Label: {}".format(label_name))

class_names = ['Iris setosa', 'Iris versicolor', 'Iris virginica']

iris_dataset = pd.read_csv(
    iris_dataset_fp,
    names=column_names)

iris_dataset.head()

model = tf.keras.Sequential([
    tf.keras.layers.Dense(49, activation=tf.nn.relu, input_shape=(4,)),  # input shape required
    tf.keras.layers.Dense(49, activation=tf.nn.relu),
    tf.keras.layers.Dense(3)

])

model.compile(
    optimizer=tf.keras.optimizers.Adam(learning_rate=0.01),  # Optimizer
    # Loss function to minimize
    loss=tf.keras.losses.BinaryCrossentropy(),
    # List of metrics to monitor
  #  metrics=[tf.keras.metrics.CategoricalAccuracy()],
    metrics=[tf.keras.metrics.SparseCategoricalAccuracy()],
)


#Convert categorical label to integers
#iris_dataset[label_name] = iris_dataset[label_name].map(
#  {"Iris-setosa":(1,0,0),"Iris-virginica":(0,1,0),"Iris-versicolor":(0,0,1)})
iris_dataset[label_name] = iris_dataset[label_name].map(
    {"Iris-setosa":0,"Iris-virginica":1,"Iris-versicolor":2})

features = iris_dataset.copy()
labels = features.pop(label_name)

print(features)
history = model.fit(features, labels, epochs=2000)
print(history)

#tf.keras.utils.plot_model(model = model , rankdir="LR", dpi=72, show_shapes=True)

logits = model(np.array([[5.9, 3.0,	4.3, 1.5]]),training=False)
print(logits)

# serialize model to json
json_model = model.to_json()
#save the model architecture to JSON file
with open('iris_model.json', 'w') as json_file:
    json_file.write(json_model)
#saving the weights of the model
model.save_weights('training/teste2/iris_weights.h5')

