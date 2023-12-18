package com.sheru.SplitBitApi.Service;

import com.sheru.SplitBitApi.Model.User;
import com.sheru.SplitBitApi.Repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserService {
    @Autowired
    private UserRepository userRepository;

    public User createUser(User user) {
        return userRepository.save(user);
    }

}
