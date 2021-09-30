package com.app;

import static org.junit.jupiter.api.Assertions.assertAll;
import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.times;

import java.time.LocalDate;
import java.util.Arrays;
import java.util.HashSet;
import java.util.List;
import java.util.Set;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;
import java.util.concurrent.TimeUnit;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import com.app.dao.CropRepository;
import com.app.dao.ShoppingCartRepository;
import com.app.dao.UserRepository;
import com.app.pojos.Crop;
import com.app.pojos.ShoppingCart;
import com.app.pojos.User;
import com.app.service.ICropService;
import com.app.service.IShoppingCartService;

@SpringBootTest
class EFarmersMarketApplicationTests {
@Autowired
private ICropService cropService;

@Autowired
private UserRepository userRepo;
@Autowired
private CropRepository crops;
@Autowired
private IShoppingCartService shoppingService;
@Autowired
private ShoppingCartRepository shoppingRepo;
private final List<Integer> itemAmounts = Arrays.asList(10, 5);
	@Test
	void testAdllCrops() {
		List<Crop> crops=cropService.getAllCropsByUserId(1);
		crops.forEach(System.out::println);
		assertEquals(1, crops.size());
	}
//	@Test
//	void testSaveCrops() {
//		User users=userRepo.findById(1).orElseThrow();
//		Set<User> user=new HashSet<>();
//		user.add(users);
//		Crop newCrop=new Crop("Wheat", 3, LocalDate.now(), 30.00);
//		newCrop.setUsers(user);
//		int i=1;
//		cropService.addCrop(newCrop,i);
//	}
	@Test
	void testGetAllCrops() {
		List<Crop> crop = crops.findByUsers_Id(1);
		assertEquals(1, crop.size());
	}
//	@Test
//	void testAddItems() {
//		
//		ShoppingCart sc=shoppingService.addItems(2, 1, 1);
//		
////		System.out.println(  sc.getBuyer());
////		sc.getCrops().forEach(System.out::println);
////		System.out.println(sc.getQuantity());
//		assertEquals(1,sc.getQuantity() );
//	}
	@Test
    void shouldIncrementItemAmount_withOptimisticLockingHandling() throws InterruptedException {
        // given
        final Crop srcItem = crops.save(new Crop());
        assertEquals(0, srcItem.getVersion());

        // when
        final ExecutorService executor = Executors.newFixedThreadPool(itemAmounts.size());
        //(int buyerId,int cropId,int quantity,double price);
        for (final int amount : itemAmounts) {
            executor.execute(() ->shoppingService.addItems(11,9,2,60));
        }
        
        executor.shutdown();
        executor.awaitTermination(1, TimeUnit.MINUTES);

        // then
        final Crop item =crops.findById(9).get();

        assertAll(
                () -> assertEquals(3, item.getVersion()),
                () -> assertEquals("Toor Dal", item.getCropName())
              
        );
    }

}
