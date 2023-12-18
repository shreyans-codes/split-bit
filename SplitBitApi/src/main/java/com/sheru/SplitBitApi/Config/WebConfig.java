package com.sheru.SplitBitApi.Config;

import com.sheru.SplitBitApi.Model.Friend;
import com.sheru.SplitBitApi.Model.User;
import com.sheru.SplitBitApi.Repository.FriendRepository;
import com.sheru.SplitBitApi.Repository.UserRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class WebConfig {
    @Bean
    CommandLineRunner commandLineRunner(UserRepository userRepository, FriendRepository friendRepository) {
        return args -> {
            User user = User.builder().userId(1L).firstName("ADMIN").build();
            if (userRepository.findById(user.getUserId()).isPresent())
                return;
            userRepository.save(user);
            Friend friend = Friend.builder().owner(user).name(user.getFirstName() + " " + user.getLastName()).friendId("1").build();
            if (friendRepository.findById(friend.getFriendId()).isPresent())
                return;
            friendRepository.save(friend);
        };
    }
}
