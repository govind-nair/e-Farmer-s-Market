package com.app.pojos;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.Table;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@ToString
@Entity
@Table(name = "user")
public class User extends BaseEntity {
@Column(length =45,nullable = false )
private String name;
@Column(length =45,nullable = false )
private String email;
@Column(length =45,nullable = false )
private String city;
@Column(length =45,nullable = false )
private String state;
@Column(length =45,nullable = false )
private String password;
@Enumerated(EnumType.STRING)
@Column
private Role role;
@Column(nullable = false )
private String adharNo;
@Column(nullable = false , length = 10 )
private String contactNo;

@Column
private int status;
}
/* id         | int         | NO   | PRI | NULL    |       |
| name       | varchar(45) | NO   |     | NULL    |       |
| email      | varchar(45) | NO   |     | NULL    |       |
| city       | varchar(45) | NO   |     | NULL    |       |
| state      | varchar(45) | NO   |     | NULL    |       |
| adhar_no   | int         | NO   |     | NULL    |       |
| contact_no | int         | NO   |     | NULL    |       |
| account_no | int         | NO   |     | NULL    |       |
| role       | varchar(45) | YES  |     | NULL    |       |
| password
*/