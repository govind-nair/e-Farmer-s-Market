package com.app.pojos;

import java.time.LocalDate;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonIgnore;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;


@NoArgsConstructor
@Getter
@Setter
@Entity
@Table(name = "orders")
public class Order extends BaseEntity{
@Column
private double orderAmount;
@Column
private LocalDate orderDate;
@ManyToOne
@JoinColumn(name = "buyer_id")
@JsonIgnore
private User buyers ;
public Order(int orderAmount, LocalDate orderDate) {
	super();
	this.orderAmount = orderAmount;
	this.orderDate = orderDate;
}


}
