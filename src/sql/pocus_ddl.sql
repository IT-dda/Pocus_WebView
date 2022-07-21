/* CREATE TABLE */
# 사용자
DROP table if exists User;
CREATE table User (
    user_id int not null auto_increment,
    id varchar(20) not null unique,
    password varchar(20) not null,
--     nickname varchar(20) not null default 'user',
--     birthday date not null,
--     gender int(1) not null check (gender IN (0, 1)),
--     height int(3) not null,
--     weight int(3) not null,

    primary key (user_id)
);

# 자세 알림 로그
DROP table if exists Log;
CREATE table Log (
    log_id int not null auto_increment,
    user_id int not null,
    date datetime default current_timestamp,
	warning varchar(100), -- 한글 50자까지 입력 가능
    isUpper int(1) not null check (isUpper IN (0, 1)),

    foreign key (user_id) references user(user_id) on delete cascade,
    primary key (log_id)
);

# 하체 데이터
DROP table if exists SS;
CREATE table SS (
    ss_id int not null auto_increment,
    user_id int not null,
    date datetime default current_timestamp,

    ss1 decimal(10, 9) not null,
    ss2 decimal(10, 9) not null,
    ss3 decimal(10, 9) not null,
    ss4 decimal(10, 9) not null,

    foreign key (user_id) references user(user_id) on delete cascade,
    primary key (ss_id)
);


# 초기 하체 데이터
DROP table if exists InitSS;
CREATE table InitSS (
    initss_id int not null auto_increment,
    user_id int not null,
    ss_id int not null,
    date datetime default current_timestamp,

    foreign key (ss_id) references ss(ss_id),
    foreign key (user_id) references user(user_id) on delete cascade,
    primary key (initss_id)
);