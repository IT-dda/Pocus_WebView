/* CREATE TABLE */
DROP table if exists User;
CREATE table User (
    user_id int not null auto_increment,
    id varchar(20) not null unique,
    password varchar(20) not null,
--     nickname varchar(20) not null default 'user',
--     birthday date not null,
--     gender tinyint not null check (gender IN (0, 1)),
--     height tinyint not null,
--     weight tinyint not null,

    primary key (user_id)
);

DROP table if exists Log;
CREATE table Log (
    log_id int not null auto_increment,
    user_id int not null,
    date datetime default current_timestamp,
	warning varchar(100), -- 한글 50자까지 입력 가능
    isUpper tinyint not null check (isUpper IN (0, 1)),

    foreign key (user_id) references user(user_id) on delete cascade,
    primary key (log_id)
);

DROP table if exists SS;
CREATE table SS (
    log_id int not null,
    ss1 smallint not null,
    ss2 smallint not null,
    ss3 smallint not null,
    ss4 smallint not null,

    foreign key (log_id) references Log(log_id) on delete cascade,
    primary key (log_id)
);