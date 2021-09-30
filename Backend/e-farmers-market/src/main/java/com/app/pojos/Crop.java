package com.app.pojos;

import java.time.LocalDate;
import java.util.HashSet;
import java.util.Set;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.ManyToMany;
import javax.persistence.Table;
import javax.persistence.Version;

import com.fasterxml.jackson.annotation.JsonIgnore;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;


@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor

@Entity
@Table(name="crops")
public class Crop extends BaseEntity {

@Column(name = "crop_name",length = 45)
private String cropName;
@Column
private int quantity;
@Column
private LocalDate dateOfUpload;
@Column
private double price;
@ManyToMany
@JoinTable(name="crops_user" ,joinColumns = @JoinColumn(name="crop_id"),inverseJoinColumns = @JoinColumn(name="producer_id"))//,joinColumns =@JoinColumn (name="p_id" ),
//	inverseJoinColumns = @JoinColumn(name="producer_id"))
@JsonIgnore
private Set<User> users =new HashSet<>();
@Version
private Integer version;
@Column
private int status;
public Crop(String cropName, int quantity, LocalDate dateOfUpload, double price,int status) {
	this.cropName=cropName;
	this.quantity=quantity;
	this.dateOfUpload=dateOfUpload;
	this.price=price;
	this.status=status;
}
@Override
public String toString() {
	return "Crop [cropName=" + cropName + ", quantity=" + quantity + ", dateOfUpload=" + dateOfUpload + ", price="
			+ price + ", status="+status+"]";
}

}
