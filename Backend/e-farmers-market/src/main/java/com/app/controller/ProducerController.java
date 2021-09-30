package com.app.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
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

import com.app.dto.ErrorResponse;
import com.app.dto.ResponseDTO;
import com.app.pojos.Crop;
import com.app.service.ICropService;



@RestController
@RequestMapping("/producer")
@CrossOrigin
public class ProducerController {
@Autowired
private ICropService cropService;

@GetMapping("/{id}")
public List<Crop> fetchAllCropsByUserId(@PathVariable int id){
	System.out.println(id);
	return cropService.getAllCropsByUserId(id);
}
@GetMapping("/edit/{id}")
public Crop getCrop(@PathVariable int id) {
	System.out.println("In get crop "+id);
	return cropService.cropDetails(id);
}

@PostMapping("/add-crops/{id}")
public ResponseEntity<?> addNewCrops(@PathVariable int id,@RequestBody Crop crop){
	try {
		System.out.println(id);
		System.out.println(crop.getCropName()+"  "+crop.getPrice()+" "+crop.getQuantity());
		return new ResponseEntity<> (cropService.addCrop(crop,id),HttpStatus.CREATED);
	}
	catch(RuntimeException e) {
		System.out.println("In err "+e.getMessage());
		return new ResponseEntity<>(new ErrorResponse("Crop Addition Failed", e.getMessage()),HttpStatus.INTERNAL_SERVER_ERROR);
	}
	
}

@DeleteMapping("/{id}")
public ResponseEntity<ResponseDTO> deleteCropDetails(@PathVariable int id)
{
	System.out.println("In  delete user details "+id);
	
		//invoke service layer method for deleting users
	//	return new ResponseEntity<ResponseDTO>(new ResponseDTO ( userService.deleteUser(userId)), HttpStatus.OK);
				
	return ResponseEntity.ok(new ResponseDTO ( cropService.deleteCrop(id)));
}



@PutMapping("/{id}")
public ResponseEntity<?> updateUserDetails(@RequestBody Crop detachedCrop,@PathVariable int id){
	System.out.println("In update user "+id+" "+detachedCrop);
	//invoke service layer method for valdiationg user id
	try{	Crop existingCrop=cropService.cropDetails(id);
	//=> user id valid
	//existingUser => user details fetched from DB(stale)
	//detachedUser =>updated user details from frnt end
	existingCrop=detachedCrop;
	return ResponseEntity.ok(cropService.updateDetails(existingCrop,id));    
}catch(RuntimeException e){
	System.out.println("Err in add "+e);
	return new ResponseEntity<>(new ErrorResponse("Updating User Failed failed", e.getMessage()) ,HttpStatus.BAD_REQUEST) ;
}
}
}
