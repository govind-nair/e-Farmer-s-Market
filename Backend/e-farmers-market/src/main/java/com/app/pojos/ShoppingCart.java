package com.app.pojos;

import java.time.LocalDate;
import java.util.HashSet;
import java.util.Set;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.ManyToMany;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonIgnore;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@NoArgsConstructor
@Setter
@Getter
@Entity
@Table(name = "shopping_cart")
public class ShoppingCart extends BaseEntity {
@Column(length = 45)
private int quantity;
@Column
private LocalDate dateOfOrder;
@Column
private double price;
@JsonIgnore
@ManyToOne(fetch = FetchType.LAZY)
@JoinColumn(name = "buyer_id")
private User buyer;

@ManyToMany
@JoinTable(name="cart_crops" ,joinColumns = @JoinColumn(name="cart_id"),inverseJoinColumns = @JoinColumn(name="crop_id"))//,joinColumns =@JoinColumn (name="p_id" ),
//	inverseJoinColumns = @JoinColumn(name="producer_id"))
@JsonIgnore

private Set<Crop> crops =new HashSet<>();
public ShoppingCart(int quantity, LocalDate dateOfOrder) {
	super();
	this.quantity = quantity;
	this.dateOfOrder = dateOfOrder;
}
@Override
public String toString() {
	return "ShoppingCart [quantity=" + quantity + ", dateOfOrder=" + dateOfOrder + "]";
}

}
