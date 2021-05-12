import numpy as np

#Persona1 = c/ churn e ocupado
    # prob de aceitar a task: 0.10
        #prob de cancelar a task: 0.8
            #prob de concluir a task: 0.3
                #avg to finish: 5
                #was leader? - compare with others
                    #prob of doing LeaderTask: 0.25
    #times he accessed the platform(A): total/7dias = 0.42
    #time spent on the platform(B): A * x mins

#Persona2 = c/ churn e livre
    # prob de aceitar a task: 0.30
        #prob de cancelar a task: 0.6
            #prob de concluir a task: 0.45
                #avg to finish: 3
                #was leader? - compare with others
                    #prob of doing LeaderTask: 0.25
    #times he accessed the platform(A): total/7dias = 0.42
    #time spent on the platform(B): A * x mins

#Persona3 = s/ churn e ocupado
    # prob de aceitar a task: 0.65
        #prob de cancelar a task: 0.55
            #prob de concluir a task: 0.65
                #avg to finish: 4
                #was leader? - compare with others
                    #prob of doing LeaderTask: 0.25
    #times he accessed the platform(A): total/7dias = 0.42
    #time spent on the platform(B): A * x mins
                    
#Persona4 = s/ churn e livre
    # prob de aceitar a task: 0.8
        #prob de cancelar a task: 0.2
            #prob de concluir a task: 0.85
                #avg to finish: 2
                #was leader? - compare with others
                    #prob of doing LeaderTask: 0.25
    #times he accessed the platform(A): total/7dias = 0.42
    #time spent on the platform(B): A * x mins

mu, sigma = 10, 3 # mean and standard deviation

for i in range(10):
    s = np.random.normal(mu, sigma, 1)
    print(s)


