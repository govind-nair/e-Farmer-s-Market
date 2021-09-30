package com.app.dao;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.app.pojos.Crop;


@Repository
public interface CropRepository extends JpaRepository<Crop, Integer> {

	List<Crop> findByUsers_Id(int id);

	
}
