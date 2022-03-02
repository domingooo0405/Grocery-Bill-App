package com.accenture.web.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.accenture.web.entities.Item;
import com.accenture.web.exception.ResourceNotFoundException;
import com.accenture.web.repository.ItemRepository;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/v1")
public class ItemController {

	@Autowired
	private ItemRepository itemRepository;

	@GetMapping("/items")
	public List<Item> getAllItems() {

		return itemRepository.findAll();

	}

	@GetMapping("/items/{id}")
	public ResponseEntity<Item> getItembyId(@PathVariable Long id) {
		Item items = itemRepository.findById(id)
				.orElseThrow(() -> new ResourceNotFoundException("Item not exist with id: " + id));

		return ResponseEntity.ok(items);

	}

	@PostMapping("/items")
	public Item insertItems(@RequestBody Item items) {
		double foundDPercentage = items.getDiscountPercentage();
		double foundOriginalPrice = items.getOriginalPrice();

		if (foundDPercentage > 0) {

			double foundDiscountedPrice = foundOriginalPrice * (foundDPercentage / 100);
			double foundTotalBill = foundOriginalPrice - foundDiscountedPrice;

			items.setDiscounted(true);
			items.setDiscountedPrice(foundDiscountedPrice);
			items.setTotalBill(foundTotalBill);

			return itemRepository.save(items);
		} else {
			double foundDiscountedPrice = foundOriginalPrice * (foundDPercentage / 100);
			double foundTotalBill = foundOriginalPrice - foundDiscountedPrice;

			items.setDiscounted(false);
			items.setDiscountedPrice(foundDiscountedPrice);
			items.setTotalBill(foundTotalBill);

			return itemRepository.save(items);
		}

	}

	@PutMapping("/items/{id}")
	public ResponseEntity<Item> updateItem(@PathVariable Long id, @RequestBody Item itemDetails) {
		Item items = itemRepository.findById(id)
				.orElseThrow(() -> new ResourceNotFoundException("Item not exist with id: " + id));
		double foundDPercentage = itemDetails.getDiscountPercentage();
		double foundOriginalPrice = itemDetails.getOriginalPrice();

		if (foundDPercentage > 0) {

			double foundDiscountedPrice = foundOriginalPrice * (foundDPercentage / 100);
			double foundTotalBill = foundOriginalPrice - foundDiscountedPrice;

			items.setName(itemDetails.getName());
			items.setOriginalPrice(itemDetails.getOriginalPrice());
			items.setDiscountedPrice(foundDiscountedPrice);
			items.setDiscounted(true);
			items.setDiscountPercentage(foundDPercentage);
			items.setTotalBill(foundTotalBill);

			Item updateItems = itemRepository.save(items);
			return ResponseEntity.ok(updateItems);
		} else {
			double foundDiscountedPrice = foundOriginalPrice * (foundDPercentage / 100);
			double foundTotalBill = foundOriginalPrice - foundDiscountedPrice;

			items.setName(itemDetails.getName());
			items.setOriginalPrice(itemDetails.getOriginalPrice());
			items.setDiscountedPrice(foundDiscountedPrice);
			items.setDiscountPercentage(foundDPercentage);
			items.setDiscounted(false);
			items.setTotalBill(foundTotalBill);

			Item updateItems = itemRepository.save(items);
			return ResponseEntity.ok(updateItems);
		}

	}

	@DeleteMapping("/items/{id}")
	public ResponseEntity deleteItem(@PathVariable Long id) {
		Item items = itemRepository.findById(id)
				.orElseThrow(() -> new ResourceNotFoundException("Item not exist with id: " + id));

		itemRepository.delete(items);
		return ResponseEntity.ok("Successfully deleted");
	}
}