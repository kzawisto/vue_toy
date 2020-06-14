


import psycopg2
conn = psycopg2.connect(dbname="hello", user="hello_django", password="passwd", host="localhost")
content = [
    {
  "user"  :"tom",
  "content":"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."  ,
    "title":"post testowy 1"
},
{
    "user":"john",
    "content":"Po potopie Bóg zawarł przymierze z Noem, a przez niego z całą ludzkością, co żyje na ziemi. Jako znak tego przymierza Bóg ukazał Noemu różnobarwną tęczę na niebie",
    "title":"Noe"
},
    
{
    "user":"adam",
    "content":"Well, what can I tell you? Life in the wide world goes on much as it has this past Age, full of its own comings and goings, scarcely aware of the existence of Hobbits, for which I am very thankful.",
    "title":"Gandalf speech"
}]
create="""
CREATE TABLE IF NOT EXISTS posts( id serial PRIMARY KEY, username VARCHAR (50), content TEXT NOT NULL, created_on TIMESTAMP NOT NULL );"""
cursor.execute(create)
for c in content:
    cursor.execute("INSERT INTO posts (username, content,title, created_on) VALUES ('"+c['user']+ "','"+c['content']+ "','" +c['title']+"', NOW());")
conn.commit()
cursor.close( )
conn.close()
