package com.example.demo;

public class Review {
	private String restaurantid;
	private String review;
	
	public Review(String restaurantid, String review) {
		this.restaurantid = restaurantid;
		this.review = review;
		
	}

	public String getrestaurantid() {
		return restaurantid;
	}

	public void setrestaurantid(String restaurantid) {
		this.restaurantid = restaurantid;
	}

	public String getReview() {
		return review;
	}

	public void setReview(String review) {
		this.review = review;
	}
}
