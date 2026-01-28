package com.deverp.core.mapper;

import com.deverp.core.domain.UserAccount;
import java.util.List;

public interface UserAccountMapper {
    List<UserAccount> findAll();

    UserAccount findById(Long id);

    UserAccount findByUsername(String username);

    int insert(UserAccount account);

    int update(UserAccount account);

    int deactivate(Long id);
}
