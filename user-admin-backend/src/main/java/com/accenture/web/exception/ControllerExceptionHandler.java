package com.accenture.web.exception;

import javax.servlet.http.HttpServletRequest;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.ResponseStatus;

import lombok.extern.slf4j.Slf4j;

@Slf4j
@ControllerAdvice
public class ControllerExceptionHandler {
	@ResponseStatus(HttpStatus.BAD_REQUEST)
	@ExceptionHandler(MethodArgumentNotValidException.class)
	@ResponseBody
	public RuntimeException handleValidationExceptionErrorRequest(HttpServletRequest request,
			MethodArgumentNotValidException exception) {
		log.error("Request Parameter Validation Exception occured on path: {}", request.getRequestURI(), exception);
		return new RuntimeException(exception.getMessage());
	}

}
