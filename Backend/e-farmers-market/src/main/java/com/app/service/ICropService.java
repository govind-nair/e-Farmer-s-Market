package com.app.service;

import java.util.List;

import com.app.pojos.Crop;



public interface ICropService {
List<Crop> getAllCropsByUserId(int id);
Crop addCrop(Crop newCrop,int id);
String deleteCrop(int id);
Crop cropDetails(int id);
Crop updateDetails(Crop detachedCrop,int id);
List<Crop> getCrops();
}
