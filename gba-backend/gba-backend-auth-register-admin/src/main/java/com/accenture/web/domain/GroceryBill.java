package com.accenture.web.domain;

import java.util.List;

import com.accenture.web.entities.Item;

public abstract class GroceryBill {
	protected List<Item> itemList;
	
	private ShoppingClerk clerk;

	public GroceryBill(ShoppingClerk clerk) {
		super();
		this.clerk = clerk;
	}
	
	public void addItem(Item item) {
		
	}
	
	public void printReceipt() {
		
	}

	public abstract double getTotalBill(); 
		
	
}
