#import desired packages
from numpy import random
from numpy.core.fromnumeric import _wrapreduction
import tensorflow as tf
import tensorflow.compat.v1 as tf ## fix que encontrei no site deles
tf.disable_v2_behavior()   # dizia: AttributeError: module 'tensorflow' has no attribute 'placeholder' p/ linha 43
import numpy as np
import pandas as pd
import seaborn as sns
import matplotlib.pyplot as plt
import pickle

#import data 
#dar nomes as colunas
datasetlocal = "ML/dataset.data"
data=pd.read_csv(datasetlocal, names=['PW-Available-Tasks','PW-Accepted-Tasks','PW-Canceled-Tasks','PW-Concluded-Tasks','PW-Times-Acessed-Platform',	'PW-Time-spent-online',	'PW-avg-days-conclude-Task',	'leader-previous-week',	'PW-leader-task-Concluded',	'TW-Available-Tasks',	'TW-Accepted-Tasks',	'TW-Canceled-Task',	'TW-Concluded-Task',	'TW-Times-Acessed-Platform',	'TW-Time-spent-online',	'TW-avg-days-to-conclude-Task',	'TW-leader-previous-week'	,'TW-leader-task-Concluded','Profile']) 

num_lines = sum(1 for line in open(datasetlocal))
print("Lines in the dataset: "+ str(num_lines))

#dataset raw, visualização
print(data["Profile"].value_counts())

sns.FacetGrid(data, hue="Profile", height=5) \
  .map(plt.scatter, "PW-Times-Acessed-Platform", "PW-Time-spent-online") \
   .add_legend()


#sns.pairplot(data, hue="Profile", height=5)
plt.show()

p1=np.asarray([1,0,0,0])
p2=np.asarray([0,1,0,0])
p3=np.asarray([0,0,1,0])
p4=np.asarray([0,0,0,1])
data['Profile'] = data['Profile'].map({1:p1, 2:p2, 3:p3, 4:p4})


#shuffle the data
data=data.iloc[np.random.permutation(len(data))]
#Index reorganizado
data=data.reset_index(drop=True)

#training data 75% pra treino
x_input=data.loc[0:(int(num_lines*0.75)-1),['PW-Available-Tasks',	'PW-Accepted-Tasks',	'PW-Canceled-Tasks',	'PW-Concluded-Tasks',	'PW-Times-Acessed-Platform',	'PW-Time-spent-online',	'PW-avg-days-conclude-Task',	'leader-previous-week',	'PW-leader-task-Concluded',	'TW-Available-Tasks',	'TW-Accepted-Tasks',	'TW-Canceled-Task',	'TW-Concluded-Task',	'TW-Times-Acessed-Platform',	'TW-Time-spent-online',	'TW-avg-days-to-conclude-Task',	'TW-leader-previous-week'	,'TW-leader-task-Concluded']]#0-349
temp=data['Profile']
y_input=temp[0:int(num_lines*0.75)]

#test data 25% para analisar
x_test=data.loc[int(num_lines*0.75):int(num_lines-1),['PW-Available-Tasks',	'PW-Accepted-Tasks',	'PW-Canceled-Tasks',	'PW-Concluded-Tasks',	'PW-Times-Acessed-Platform',	'PW-Time-spent-online',	'PW-avg-days-conclude-Task',	'leader-previous-week',	'PW-leader-task-Concluded',	'TW-Available-Tasks',	'TW-Accepted-Tasks',	'TW-Canceled-Task',	'TW-Concluded-Task',	'TW-Times-Acessed-Platform',	'TW-Time-spent-online',	'TW-avg-days-to-conclude-Task',	'TW-leader-previous-week'	,'TW-leader-task-Concluded']] # 349-400
y_test=temp[int(num_lines*0.75):int(num_lines)]

#placeholders and variables. input has 4 features and output has 3 classes // 18 -> 4
x=tf.placeholder(tf.float32,shape=[None,18])
y_=tf.placeholder(tf.float32,shape=[None, 4])
#weight and bias
W=tf.Variable(tf.zeros([18,4]))
b=tf.Variable(tf.zeros([4]))

# model 
#softmax function for multiclass classification
y = tf.nn.softmax(tf.matmul(x, W) + b)
#loss function
cross_entropy = tf.reduce_mean(-tf.reduce_sum(y_ * tf.log(y), reduction_indices=[1]))

#optimiser -
train_step = tf.train.AdamOptimizer(0.01).minimize(cross_entropy)
#calculating accuracy of our model 
correct_prediction = tf.equal(tf.argmax(y,1), tf.argmax(y_,1))
accuracy = tf.reduce_mean(tf.cast(correct_prediction, tf.float32))

#session parameters
sess = tf.InteractiveSession()
#initialising variables
init = tf.global_variables_initializer()
sess.run(init)
#number of interations
epoch=200

for step in range(epoch):
   _, c=sess.run([train_step,cross_entropy], feed_dict={x: x_input, y_:[t for t in y_input.to_numpy()]})
   if step%20==0 :
       print ("Epoch: "+str(step)+"---------- Loss: " + str(c))


#data=pd.read_csv("ML/minidataset.data", names=['PW-Available-Tasks','PW-Accepted-Tasks','PW-Canceled-Tasks','PW-Concluded-Tasks','PW-Times-Acessed-Platform',	'PW-Time-spent-online',	'PW-avg-days-conclude-Task',	'leader-previous-week',	'PW-leader-task-Concluded',	'TW-Available-Tasks',	'TW-Accepted-Tasks',	'TW-Canceled-Task',	'TW-Concluded-Task',	'TW-Times-Acessed-Platform',	'TW-Time-spent-online',	'TW-avg-days-to-conclude-Task',	'TW-leader-previous-week'	,'TW-leader-task-Concluded','Profile']) 

randNum = random.randint(int(num_lines))
#random testing 
a=data.loc[randNum,['PW-Available-Tasks',	'PW-Accepted-Tasks',	'PW-Canceled-Tasks',	'PW-Concluded-Tasks',	'PW-Times-Acessed-Platform',	'PW-Time-spent-online',	'PW-avg-days-conclude-Task',	'leader-previous-week',	'PW-leader-task-Concluded',	'TW-Available-Tasks',	'TW-Accepted-Tasks',	'TW-Canceled-Task',	'TW-Concluded-Task',	'TW-Times-Acessed-Platform',	'TW-Time-spent-online',	'TW-avg-days-to-conclude-Task',	'TW-leader-previous-week'	,'TW-leader-task-Concluded']]
b=a.values.reshape(1,18)
largest = sess.run(tf.arg_max(y,1), feed_dict={x: b})[0]

largest += 1
#print(largest)
#W.eval()
#print('a = ', _)
#print('b = ', c)
 
if largest==1:
    print ("We predict this person has churn and probably had a busy week")
elif largest==2:
    print ("We predict this person has churn and probably had an active week")
elif largest ==3:
    print ("We predict this person doesnt have churn and probably had a busy week")
else:
    print ("We predict this person doesnt have churn and probably had an active week")    

print ("Accuracy is: "+ str(sess.run(accuracy,feed_dict={x: x_test, y_:[t for t in y_test.to_numpy()]})))


#import pickle
#class pickledModel:
#    def __init__(self, weight, bias):
#        self.weight = weight
#        self.bias = bias

#pickledModeSafe = pickledModel(W,b)
#pickle.dump(1, open( "ML/save.p", "wb" ))


# AttributeError: 'Series' object has no attribute 'reshape', trocar reshape por values.reshape
# AttributeError: 'DataFrame' object has no attribute 'ix', troccar .ix por .loc