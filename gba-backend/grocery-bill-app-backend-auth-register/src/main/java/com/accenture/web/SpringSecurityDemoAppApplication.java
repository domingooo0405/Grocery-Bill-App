package com.accenture.web;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class SpringSecurityDemoAppApplication {

//	@Autowired
//	private PasswordEncoder passwordEncoder;
//
//	@Autowired
//	private UserDetailsRepository userDetailsRepository;

	public static void main(String[] args) {
		SpringApplication.run(SpringSecurityDemoAppApplication.class, args);
	}

//	@PostConstruct
//	protected void init() {
//
//		List<Authority> authorityList = new ArrayList<>();
//
//		authorityList.add(createAuthority("USER", "User role"));
//		authorityList.add(createAuthority("ADMIN", "Admin role"));
//
//		User user = new User();
//
//		user.setUserName("admin");
//		user.setFirstName("admin");
//		user.setLastName("Macunay");
//
//		user.setPassword(passwordEncoder.encode("admin"));
//		user.setEnabled(true);
//		user.setAuthorities(authorityList);
//
//		userDetailsRepository.save(user);
//
//	}
//
//	private Authority createAuthority(String roleCode, String roleDescription) {
//		Authority authority = new Authority();
//		authority.setRoleCode(roleCode);
//		authority.setRoleDescription(roleDescription);
//		return authority;
//	}

}