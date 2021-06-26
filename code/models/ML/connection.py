from mysql.connector import MySQLConnection, Error


def insert_book(event,target,state):
    query = "INSERT INTO Task(event_task,target_task,state_task) " \
            "VALUES(%s,%s,%s)"
    args = (event,target,state)
    print(args)
    try:
    
        conn = MySQLConnection (host='remotemysql.com', port= 3306, user='yoP9oIXnRG', passwd='COip73bLeK',database= 'yoP9oIXnRG', charset='utf8mb4')


        cursor = conn.cursor()
        cursor.execute(query, args)

        if cursor.lastrowid:
            print('last insert id', cursor.lastrowid)
        else:
            print('last insert id not found')

        conn.commit()
    except Error as error:
        print("error")
        print(error)

    finally:
        cursor.close()
        conn.close()

def main():
   insert_book(1,1,1)

if __name__ == '__main__':
    main()