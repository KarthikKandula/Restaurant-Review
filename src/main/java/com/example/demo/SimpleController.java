package com.example.demo;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

@Controller
public class SimpleController {
	
	@RequestMapping(value = "/login", method = {RequestMethod.GET, RequestMethod.POST})
	public String login(String username, String password, Model model) throws ClassNotFoundException, SQLException {

			String dburl = "jdbc:sqlserver://itkmssql.ad.ilstu.edu:1433;databaseName=KPIT353Project;integratedSecurity=true;domain=adilstu;authenticationScheme=JavaKerberos;";
			String dbuser = "IT353S908";
	        String dbpass = "sun56";

	        Class.forName("com.microsoft.sqlserver.jdbc.SQLServerDriver");
	        Connection con= null;	     
	        con = DriverManager.getConnection(dburl, dbuser, dbpass);
	        
	        String sql = "select * from userlogin where username=? and password=?";			
			PreparedStatement ps = null;			
			ResultSet rs = null;			
			ps = con.prepareStatement(sql);
	        ps.setString(1, username);
	        ps.setString(2, password);
			rs = ps.executeQuery(); 
		
         
			if(rs.next())
	
			{
				model.addAttribute("username",username);
				return "Homepage";
			   	
			}
			else
			{
				model.addAttribute("error", "invalid credentials or user doesn't exist");
				return "Error";
			}

	}
	
	@RequestMapping(value = "/register", method = {RequestMethod.GET, RequestMethod.POST})
	public String register(String username, String password, String firstname, String lastname, Model model) throws ClassNotFoundException, SQLException {

			String dburl = "jdbc:sqlserver://itkmssql.ad.ilstu.edu:1433;databaseName=KPIT353Project;integratedSecurity=true;domain=adilstu;authenticationScheme=JavaKerberos;";
			String dbuser = "IT353S908";
	        String dbpass = "sun56";

	        Class.forName("com.microsoft.sqlserver.jdbc.SQLServerDriver");
	        Connection con= null;	     
	        con = DriverManager.getConnection(dburl, dbuser, dbpass);
			
	        String sqlcheck = "select username from userlogin where username=? ";
	        PreparedStatement ps1 = null;			
			ResultSet rs1 = null;			
			ps1 = con.prepareStatement(sqlcheck);
	        ps1.setString(1, username);
	        rs1 = ps1.executeQuery();
	        
			if(rs1.next())
			{
				model.addAttribute("error", "User already exists");
				return "Error";
			}
			
			else
			{
				String sqlstatement = "INSERT INTO userlogin(username, password,firstname,lastname) VALUES (?,?,?,?)";
				ps1 = con.prepareStatement(sqlstatement);
				ps1.setString(1, username);
				ps1.setString(2, password);
				ps1.setString(3, firstname);
				ps1.setString(4, lastname);
				ps1.execute();
				
				model.addAttribute("username",username);
				return "Homepage";
			}


	}
	@RequestMapping(value = "/review", method = {RequestMethod.GET, RequestMethod.POST})
	public String review(String restaurantid, String review, Model model) throws ClassNotFoundException, SQLException {

			String dburl = "jdbc:sqlserver://itkmssql.ad.ilstu.edu:1433;databaseName=KPIT353Project;integratedSecurity=true;domain=adilstu;authenticationScheme=JavaKerberos;";
			String dbuser = "IT353S908";
	        String dbpass = "sun56";

	        Class.forName("com.microsoft.sqlserver.jdbc.SQLServerDriver");
	        Connection con= null;	     
	        con = DriverManager.getConnection(dburl, dbuser, dbpass);
	        
	        
	        String sqlstatement = "INSERT INTO user_reviews(restaurantid, review) VALUES (?,?)";
			PreparedStatement ps1 = null;	
			//ResultSet rs2 = null;
	        ps1 = con.prepareStatement(sqlstatement);
			ps1.setString(1, restaurantid);
			ps1.setString(2, review);
			ps1.execute();
			
			model.addAttribute("review",review);
			return "ReviewPage";
			
	}
	
}
