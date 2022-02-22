package com.accenture.web.domain;

public class DiscountedBill extends GroceryBill{

	public DiscountedBill(ShoppingClerk clerk) {
		super(clerk);
		// TODO Auto-generated constructor stub
	}

	@Override
	public double getTotalBill() {
		
		return 0;
	}

}
