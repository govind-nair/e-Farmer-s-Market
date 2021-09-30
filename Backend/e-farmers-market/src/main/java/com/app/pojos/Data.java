package com.app.pojos;

import com.fasterxml.jackson.annotation.JsonProperty;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;
@AllArgsConstructor
@NoArgsConstructor
@Setter
@Getter
@ToString
public class Data {
@JsonProperty
private int buyerId;
@JsonProperty
private int cropId;
@JsonProperty
private int quantity;
@JsonProperty
private double total;
}
