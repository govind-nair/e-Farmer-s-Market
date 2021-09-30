package com.app.service;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.orm.ObjectOptimisticLockingFailureException;
import org.springframework.stereotype.Service;

import com.app.dao.CropRepository;
import com.app.dao.UserRepository;
import com.app.pojos.Crop;
import com.app.pojos.User;
@Transactional
@Service
public class CropServiceImpl implements ICropService {
@Autowired
private CropRepository cropRepo;
@Autowired
private UserRepository userRepo;

	@Override
	public List<Crop> getAllCropsByUserId(int id) {//producer
		
	
		List<Crop> allCrops = cropRepo.findByUsers_Id(id);
	List<Crop> validCrops=new ArrayList<Crop>();
	
	allCrops.forEach(crop->{
	//	System.out.println(crop.getStatus());
		
	if(crop.getStatus()==0 && crop.getQuantity()!=0)
	validCrops.add(crop);
	else
		crop.setStatus(1);
	});
	 
	
		//allCrops.forEach(c->System.out.println(c.getUsers()));
		return validCrops;
	}

	@Override
		public Crop addCrop(Crop newCrop, int id) {
			User user=userRepo.getById(id);
			Set<User> users=new HashSet<>();
			users.add(user);
			newCrop.setUsers(users);
			newCrop.setStatus(0);
			cropRepo.save(newCrop);
			System.out.println(newCrop.getUsers());
			return newCrop;
		}
	@Override
		public String deleteCrop(int id) {
		Crop crop=cropRepo.getById(id);
		crop.setStatus(1);
		cropRepo.save(crop);
			return "Deleted by Id"+id;
		}
	
	@Override
		public Crop cropDetails(int id) {
			System.out.println(cropRepo.getById(id));
			return cropRepo.getById(id);
		}
	
	@Override

		public Crop updateDetails(Crop detachedCrop,int id) {
		System.out.println("Hello");
		Crop existingCrop  =cropRepo.getById(id);
	try {	
		System.out.println(existingCrop);
		existingCrop.setDateOfUpload(detachedCrop.getDateOfUpload());
		existingCrop.setPrice(detachedCrop.getPrice());
		existingCrop.setQuantity(existingCrop.getQuantity());
			return cropRepo.save(existingCrop);}
	catch(ObjectOptimisticLockingFailureException e) {
		return cropRepo.save(existingCrop);
	}
		}
	
	@Override

		public List<Crop> getCrops() {//buyer
		 List<Crop> crops = new ArrayList<Crop>();
			cropRepo.findAll().forEach(crop->{
			//	System.out.println(crop.getStatus());
				
			if(crop.getStatus()==0 && crop.getQuantity()!=0)
			crops.add(crop);
			else
				crop.setStatus(1);
			});
			 
			 return crops;
		}

}
