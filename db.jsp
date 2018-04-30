<%@ page import = "java.sql.*, java.util.*, java.io.*" %><%		
Connection con=null;
try {
Class.forName("com.mysql.jdbc.Driver");
con = DriverManager.getConnection("jdbc:mysql://localhost:3306/cs166db", "cs166db", "Spring2017!");
}
catch(Exception e) {
	out.print("Try again");
	return;
}
%>