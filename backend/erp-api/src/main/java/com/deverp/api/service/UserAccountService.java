package com.deverp.api.service;

import com.deverp.core.domain.UserAccount;
import com.deverp.core.mapper.UserAccountMapper;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class UserAccountService {
    private final UserAccountMapper userAccountMapper;

    public List<UserAccount> getUsers() {
        return userAccountMapper.findAll();
    }

    @Transactional
    public UserAccount createUser(UserAccount account) {
        userAccountMapper.insert(account);
        return userAccountMapper.findById(account.getId());
    }
}
