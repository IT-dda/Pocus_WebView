/* CREATE TABLE */
# 사용자
DROP table if exists User;
CREATE table User (
    user_id int not null auto_increment,
    id varchar(20) not null unique,
    password varchar(20) not null,
    -- nickname varchar(20) not null default 'user',
    -- birthday date not null,
    -- gender int(1) not null check (gender IN (0, 1)),
    -- height int(3) not null,
    -- weight int(3) not null,

    primary key (user_id)
);


# 상체 데이터
DROP table if exists MP;
CREATE table MP (
    mp_id int not null auto_increment,
    user_id int not null,
    date datetime default current_timestamp,

    lm0 JSON not null,
    lm1 JSON not null,
    lm2 JSON not null,
    lm3 JSON not null,
    lm4 JSON not null,
    lm5 JSON not null,
    lm6 JSON not null,
    lm7 JSON not null,
    lm8 JSON not null,
    lm9 JSON not null,
    lm10 JSON not null,
    lm11 JSON not null,
    lm12 JSON not null,
    lm13 JSON not null,
    lm14 JSON not null,
    lm15 JSON not null,
    lm16 JSON not null,
    lm17 JSON not null,
    lm18 JSON not null,
    lm19 JSON not null,
    lm20 JSON not null,
    lm21 JSON not null,
    lm22 JSON not null,

    foreign key (user_id) references user(user_id) on delete cascade,
    primary key (mp_id)
);


# 초기 상체 데이터
DROP table if exists InitMP;
CREATE table InitMP (
    initmp_id int not null auto_increment,
    user_id int not null,
    mp_id int not null,
    date datetime default current_timestamp,

    foreign key (mp_id) references mp(mp_id),
    foreign key (user_id) references user(user_id) on delete cascade,
    primary key (initmp_id)
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
