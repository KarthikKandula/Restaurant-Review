package com.example.demo;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;


import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class ReviewController {
	
	@RequestMapping(value = "/getreviews", method = {RequestMethod.GET, RequestMethod.POST})
	public ArrayList<Review> getReviews() throws ClassNotFoundException, SQLException {

	ArrayList<Review> ReviewList = new ArrayList<Review>();
	String dburl = "jdbc:sqlserver://itkmssql.ad.ilstu.edu:1433;databaseName=KPIT353Project;integratedSecurity=true;domain=adilstu;authenticationScheme=JavaKerberos;";
	String dbuser = "IT353S908";
    String dbpass = "sun56";
    Connection con = null;
    Class.forName("com.microsoft.sqlserver.jdbc.SQLServerDriver");
    
    con = DriverManager.getConnection(dburl, dbuser, dbpass);
    
    String sql = "select * from user_reviews";			
	PreparedStatement ps = null;			
	ResultSet rs = null;			
	ps = con.prepareStatement(sql);
	rs = ps.executeQuery();
	
	while(rs.next())
	{
		ReviewList.add(new Review(rs.getString(1),rs.getString(2)));
	}
	return ReviewList;
    }
}
