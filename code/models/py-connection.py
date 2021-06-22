import pymysql
connection= pymysql.connect(host='remotemysql.com', port= 3306, user='yoP9oIXnRG', passwd='COip73bLeK',database= 'yoP9oIXnRG', charset='utf8mb4', cursorclass=pymysql.cursors.DictCursor)

mysql_cursor =connection.cursor()

