insert into user (id, password, nickname, birthday, gender, height, weight) values ('abcd', '1234', 'testuser', '1999-01-01', 0, 111, 11);
insert into user(id, password, birthday, gender, height, weight) values ('efgh', '1111', '1999-12-31', 1, 222, 22);
select * from user;

insert into log (user_id, warning, isUpper) values (12, '거북목 자세가 감지되었습니다.', 1);
insert into log (user_id, warning, isUpper) values (12, '하체 자세의 무게중심이 흐트러졌습니다.', 0);
select * from log;

insert into ss (log_id, ss1, ss2, ss3, ss4) values (4, 111, 222, 333, 444);
select * from ss;
