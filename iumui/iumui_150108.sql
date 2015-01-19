/* 회원 */
DROP TABLE members 
	CASCADE CONSTRAINTS;

/* 모집게시판 */
DROP TABLE iboard 
	CASCADE CONSTRAINTS;

/* 댓글 */
DROP TABLE bcomment 
	CASCADE CONSTRAINTS;

/* 그룹게시판 */
DROP TABLE gboard 
	CASCADE CONSTRAINTS;

/* 그룹 */
DROP TABLE ggroup 
	CASCADE CONSTRAINTS;

/* 그룹 댓글 */
DROP TABLE gcomment 
	CASCADE CONSTRAINTS;

/* 그룹 회원 */
DROP TABLE gmembers 
	CASCADE CONSTRAINTS;

/* 그룹일정 */
DROP TABLE gschedule 
	CASCADE CONSTRAINTS;

/* 게시판분류 */
DROP TABLE bmaster 
	CASCADE CONSTRAINTS;

/* 첨부파일 */
DROP TABLE gfile 
	CASCADE CONSTRAINTS;

/* 참여요청 */
DROP TABLE request 
	CASCADE CONSTRAINTS;

/* 추천수 */
DROP TABLE recommend 
	CASCADE CONSTRAINTS;

/* 지역분류 */
DROP TABLE slocal 
	CASCADE CONSTRAINTS;

/* 회원 */
CREATE TABLE members (
	mno INTEGER NOT NULL, /* 회원번호 */
	email VARCHAR2(50) NOT NULL, /* 이메일 */
	pwd VARCHAR2(50) NOT NULL, /* 비밀번호 */
	uname VARCHAR2(50) NOT NULL, /* 이름 */
	birth VARCHAR2(50) NOT NULL, /* 생년월일 */
	nick VARCHAR2(50), /* 별명 */
	phone VARCHAR2(50) NOT NULL, /* 핸드폰 */
	sex INTEGER NOT NULL, /* 성별 */
	myphoto VARCHAR(100), /* 내사진 */
	intro VARCHAR(100), /* 인사말 */
	lcode VARCHAR2(50) NOT NULL /* 지역분류코드 */
);

COMMENT ON TABLE members IS '회원';

COMMENT ON COLUMN members.mno IS '회원번호';

COMMENT ON COLUMN members.email IS '이메일';

COMMENT ON COLUMN members.pwd IS '비밀번호';

COMMENT ON COLUMN members.uname IS '이름';

COMMENT ON COLUMN members.birth IS '생년월일';

COMMENT ON COLUMN members.nick IS '별명';

COMMENT ON COLUMN members.phone IS '핸드폰';

COMMENT ON COLUMN members.sex IS '성별';

COMMENT ON COLUMN members.myphoto IS '내사진';

COMMENT ON COLUMN members.intro IS '인사말';

COMMENT ON COLUMN members.lcode IS '지역분류코드';

CREATE UNIQUE INDEX PK_members
	ON members (
		mno ASC
	);

CREATE UNIQUE INDEX UIX_members
	ON members (
		email ASC,
		phone ASC
	);

ALTER TABLE members
	ADD
		CONSTRAINT PK_members
		PRIMARY KEY (
			mno
		);

ALTER TABLE members
	ADD
		CONSTRAINT UK_members
		UNIQUE (
			email,
			phone
		);


/* 모집게시판 */
CREATE TABLE iboard (
	bno INTEGER NOT NULL, /* 게시글번호 */
	bmno INTEGER NOT NULL, /* 게시판구분번호 */
	mno INTEGER NOT NULL, /* 회원번호 */
	bname VARCHAR2(50) NOT NULL, /* 모임이름 */
	bintro VARCHAR2(1000) NOT NULL, /* 모임소개 */
	btarget_num INTEGER NOT NULL, /* 모임인원 */
	start_date DATE NOT NULL, /* 모집일자 */
	end_date DATE NOT NULL, /* 종료일자 */
	click_count INTEGER DEFAULT 0 NOT NULL, /* 조회수 */
	lcode VARCHAR2(50) NOT NULL /* 지역분류코드 */
);

COMMENT ON TABLE iboard IS '모집게시판';

COMMENT ON COLUMN iboard.bno IS '게시글번호';

COMMENT ON COLUMN iboard.bmno IS '게시판구분번호';

COMMENT ON COLUMN iboard.mno IS '회원번호';

COMMENT ON COLUMN iboard.bname IS '모임이름';

COMMENT ON COLUMN iboard.bintro IS '모임소개';

COMMENT ON COLUMN iboard.btarget_num IS '모임인원';

COMMENT ON COLUMN iboard.start_date IS '모집일자';

COMMENT ON COLUMN iboard.end_date IS '종료일자';

COMMENT ON COLUMN iboard.click_count IS '조회수';

COMMENT ON COLUMN iboard.lcode IS '지역분류코드';

CREATE UNIQUE INDEX PK_iboard
	ON iboard (
		bno ASC
	);

ALTER TABLE iboard
	ADD
		CONSTRAINT PK_iboard
		PRIMARY KEY (
			bno
		);

/* 댓글 */
CREATE TABLE bcomment (
	bcno INTEGER NOT NULL, /* 댓글번호 */
	bno INTEGER NOT NULL, /* 게시글번호 */
	mno INTEGER NOT NULL, /* 회원번호 */
	content VARCHAR2(500) NOT NULL, /* 댓글내용 */
	redate DATE NOT NULL /* 작성일 */
);

COMMENT ON TABLE bcomment IS '댓글';

COMMENT ON COLUMN bcomment.bcno IS '댓글번호';

COMMENT ON COLUMN bcomment.bno IS '게시글번호';

COMMENT ON COLUMN bcomment.mno IS '회원번호';

COMMENT ON COLUMN bcomment.content IS '댓글내용';

COMMENT ON COLUMN bcomment.redate IS '작성일';

CREATE UNIQUE INDEX PK_bcomment
	ON bcomment (
		bcno ASC
	);

ALTER TABLE bcomment
	ADD
		CONSTRAINT PK_bcomment
		PRIMARY KEY (
			bcno
		);

/* 그룹게시판 */
CREATE TABLE gboard (
	gbno INTEGER NOT NULL, /* 그룹게시글번호 */
	grouping_no INTEGER NOT NULL, /* 그룹회원번호 */
	gbcontent VARCHAR2(500) NOT NULL, /* 게시글내용 */
	reg_date DATE NOT NULL /* 작성시간 */
);

COMMENT ON TABLE gboard IS '그룹게시판';

COMMENT ON COLUMN gboard.gbno IS '그룹게시글번호';

COMMENT ON COLUMN gboard.grouping_no IS '그룹회원번호';

COMMENT ON COLUMN gboard.gbcontent IS '게시글내용';

COMMENT ON COLUMN gboard.reg_date IS '작성시간';

CREATE UNIQUE INDEX PK_gboard
	ON gboard (
		gbno ASC
	);

ALTER TABLE gboard
	ADD
		CONSTRAINT PK_gboard
		PRIMARY KEY (
			gbno
		);

/* 그룹 */
CREATE TABLE ggroup (
	gno INTEGER NOT NULL, /* 그룹번호 */
	gname VARCHAR2(50) NOT NULL, /* 모임이름 */
	gintro VARCHAR2(110) NOT NULL, /* 모임소개 */
	gend_date DATE NOT NULL, /* 종료일자 */
	open_state INTEGER NOT NULL /* 공개여부 */
);

COMMENT ON TABLE ggroup IS '그룹';

COMMENT ON COLUMN ggroup.gno IS '그룹번호';

COMMENT ON COLUMN ggroup.gname IS '모임이름';

COMMENT ON COLUMN ggroup.gintro IS '모임소개';

COMMENT ON COLUMN ggroup.gend_date IS '종료일자';

COMMENT ON COLUMN ggroup.open_state IS '공개여부';

CREATE UNIQUE INDEX PK_ggroup
	ON ggroup (
		gno ASC
	);

ALTER TABLE ggroup
	ADD
		CONSTRAINT PK_ggroup
		PRIMARY KEY (
			gno
		);

/* 그룹 댓글 */
CREATE TABLE gcomment (
	gbcno INTEGER NOT NULL, /* 그룹댓글번호 */
	gbno INTEGER NOT NULL, /* 그룹게시글번호 */
	grouping_no INTEGER NOT NULL, /* 그룹회원번호 */
	content VARCHAR2(500) NOT NULL, /* 그룹게시판댓글내용 */
	reg_date DATE NOT NULL /* 그룹게시판댓글작성시간 */
);

COMMENT ON TABLE gcomment IS '그룹 댓글';

COMMENT ON COLUMN gcomment.gbcno IS '그룹댓글번호';

COMMENT ON COLUMN gcomment.gbno IS '그룹게시글번호';

COMMENT ON COLUMN gcomment.grouping_no IS '그룹회원번호';

COMMENT ON COLUMN gcomment.content IS '그룹게시판댓글내용';

COMMENT ON COLUMN gcomment.reg_date IS '그룹게시판댓글작성시간';

CREATE UNIQUE INDEX PK_gcomment
	ON gcomment (
		gbcno ASC
	);

ALTER TABLE gcomment
	ADD
		CONSTRAINT PK_gcomment
		PRIMARY KEY (
			gbcno
		);

/* 그룹 회원 */
CREATE TABLE gmembers (
	grouping_no INTEGER NOT NULL, /* 그룹회원번호 */
	gno INTEGER NOT NULL, /* 그룹번호 */
	mno INTEGER NOT NULL, /* 회원번호 */
	manager_status INTEGER NOT NULL, /* 등급 */
	color VARCHAR2(50) /* 색상 */
);

COMMENT ON TABLE gmembers IS '그룹 회원';

COMMENT ON COLUMN gmembers.grouping_no IS '그룹회원번호';

COMMENT ON COLUMN gmembers.gno IS '그룹번호';

COMMENT ON COLUMN gmembers.mno IS '회원번호';

COMMENT ON COLUMN gmembers.manager_status IS '등급';

COMMENT ON COLUMN gmembers.color IS '색상';

CREATE UNIQUE INDEX PK_gmembers
	ON gmembers (
		grouping_no ASC
	);

CREATE UNIQUE INDEX UIX_gmembers
	ON gmembers (
		gno ASC,
		mno ASC
	);

ALTER TABLE gmembers
	ADD
		CONSTRAINT PK_gmembers
		PRIMARY KEY (
			grouping_no
		);

ALTER TABLE gmembers
	ADD
		CONSTRAINT UK_gmembers
		UNIQUE (
			gno,
			mno
		);

/* 그룹일정 */
CREATE TABLE gschedule (
	calendarno INTEGER NOT NULL, /* 일정번호 */
	gno INTEGER NOT NULL, /* 그룹번호 */
	cdate DATE NOT NULL, /* 날짜 */
	cschedule VARCHAR2(500) NOT NULL /* 내용 */
);

COMMENT ON TABLE gschedule IS '그룹일정';

COMMENT ON COLUMN gschedule.calendarno IS '일정번호';

COMMENT ON COLUMN gschedule.gno IS '그룹번호';

COMMENT ON COLUMN gschedule.cdate IS '날짜';

COMMENT ON COLUMN gschedule.cschedule IS '내용';

CREATE UNIQUE INDEX PK_gschedule
	ON gschedule (
		calendarno ASC
	);

ALTER TABLE gschedule
	ADD
		CONSTRAINT PK_gschedule
		PRIMARY KEY (
			calendarno
		);

/* 게시판분류 */
CREATE TABLE bmaster (
	bmno INTEGER NOT NULL, /* 게시판구분번호 */
	bcategory VARCHAR2(50) /* 분류명 */
);

COMMENT ON TABLE bmaster IS '게시판분류';

COMMENT ON COLUMN bmaster.bmno IS '게시판구분번호';

COMMENT ON COLUMN bmaster.bcategory IS '분류명';

CREATE UNIQUE INDEX PK_bmaster
	ON bmaster (
		bmno ASC
	);

ALTER TABLE bmaster
	ADD
		CONSTRAINT PK_bmaster
		PRIMARY KEY (
			bmno
		);

/* 첨부파일 */
CREATE TABLE gfile (
	gfno INTEGER NOT NULL, /* 파일번호 */
	gbno INTEGER NOT NULL, /* 그룹게시글번호 */
	gfname VARCHAR2(50) NOT NULL, /* 파일경로 */
	gfiletime VARCHAR(100) NOT NULL /* 업로드시간 */
);

COMMENT ON TABLE gfile IS '첨부파일';

COMMENT ON COLUMN gfile.gfno IS '파일번호';

COMMENT ON COLUMN gfile.gbno IS '그룹게시글번호';

COMMENT ON COLUMN gfile.gfname IS '파일경로';

COMMENT ON COLUMN gfile.gfiletime IS '업로드시간';

CREATE UNIQUE INDEX PK_gfile
	ON gfile (
		gfno ASC
	);

ALTER TABLE gfile
	ADD
		CONSTRAINT PK_gfile
		PRIMARY KEY (
			gfno
		);

/* 참여요청 */
CREATE TABLE request (
	bno INTEGER NOT NULL, /* 게시글번호 */
	mno INTEGER NOT NULL, /* 회원번호 */
	state INTEGER NOT NULL, /* 상태 */
	call DATE NOT NULL /* 요청일 */
);

COMMENT ON TABLE request IS '참여요청';

COMMENT ON COLUMN request.bno IS '게시글번호';

COMMENT ON COLUMN request.mno IS '회원번호';

COMMENT ON COLUMN request.state IS '상태';

COMMENT ON COLUMN request.call IS '요청일';

CREATE UNIQUE INDEX PK_request
	ON request (
		bno ASC,
		mno ASC
	);

ALTER TABLE request
	ADD
		CONSTRAINT PK_request
		PRIMARY KEY (
			bno,
			mno
		);

/* 추천수 */
CREATE TABLE recommend (
	bno INTEGER NOT NULL, /* 게시글번호 */
	mno INTEGER NOT NULL, /* 회원번호 */
	recomtime DATE NOT NULL /* 추천시간 */
);

COMMENT ON TABLE recommend IS '추천수';

COMMENT ON COLUMN recommend.bno IS '게시글번호';

COMMENT ON COLUMN recommend.mno IS '회원번호';

COMMENT ON COLUMN recommend.recomtime IS '추천시간';

CREATE UNIQUE INDEX PK_recommend
	ON recommend (
		bno ASC,
		mno ASC
	);

ALTER TABLE recommend
	ADD
		CONSTRAINT PK_recommend
		PRIMARY KEY (
			bno,
			mno
		);

/* 지역분류 */
CREATE TABLE slocal (
	lcode VARCHAR2(50) NOT NULL, /* 지역분류코드 */
	lname VARCHAR2(50) /* 분류명 */
);

COMMENT ON TABLE slocal IS '지역분류';

COMMENT ON COLUMN slocal.lcode IS '지역분류코드';

COMMENT ON COLUMN slocal.lname IS '분류명';

CREATE UNIQUE INDEX PK_slocal
	ON slocal (
		lcode ASC
	);

ALTER TABLE slocal
	ADD
		CONSTRAINT PK_slocal
		PRIMARY KEY (
			lcode
		);

ALTER TABLE members
	ADD
		CONSTRAINT FK_slocal_TO_members
		FOREIGN KEY (
			lcode
		)
		REFERENCES slocal (
			lcode
		);

ALTER TABLE iboard
	ADD
		CONSTRAINT FK_members_TO_iboard
		FOREIGN KEY (
			mno
		)
		REFERENCES members (
			mno
		);

ALTER TABLE iboard
	ADD
		CONSTRAINT FK_bmaster_TO_iboard
		FOREIGN KEY (
			bmno
		)
		REFERENCES bmaster (
			bmno
		);

ALTER TABLE iboard
	ADD
		CONSTRAINT FK_slocal_TO_iboard
		FOREIGN KEY (
			lcode
		)
		REFERENCES slocal (
			lcode
		);

ALTER TABLE bcomment
	ADD
		CONSTRAINT FK_iboard_TO_bcomment
		FOREIGN KEY (
			bno
		)
		REFERENCES iboard (
			bno
		);

ALTER TABLE bcomment
	ADD
		CONSTRAINT FK_members_TO_bcomment
		FOREIGN KEY (
			mno
		)
		REFERENCES members (
			mno
		);

ALTER TABLE gboard
	ADD
		CONSTRAINT FK_gmembers_TO_gboard
		FOREIGN KEY (
			grouping_no
		)
		REFERENCES gmembers (
			grouping_no
		);

ALTER TABLE gcomment
	ADD
		CONSTRAINT FK_gboard_TO_gcomment
		FOREIGN KEY (
			gbno
		)
		REFERENCES gboard (
			gbno
		);

ALTER TABLE gcomment
	ADD
		CONSTRAINT FK_gmembers_TO_gcomment
		FOREIGN KEY (
			grouping_no
		)
		REFERENCES gmembers (
			grouping_no
		);

ALTER TABLE gmembers
	ADD
		CONSTRAINT FK_ggroup_TO_gmembers
		FOREIGN KEY (
			gno
		)
		REFERENCES ggroup (
			gno
		);

ALTER TABLE gmembers
	ADD
		CONSTRAINT FK_members_TO_gmembers
		FOREIGN KEY (
			mno
		)
		REFERENCES members (
			mno
		);

ALTER TABLE gschedule
	ADD
		CONSTRAINT FK_ggroup_TO_gschedule
		FOREIGN KEY (
			gno
		)
		REFERENCES ggroup (
			gno
		);

ALTER TABLE gfile
	ADD
		CONSTRAINT FK_gboard_TO_gfile
		FOREIGN KEY (
			gbno
		)
		REFERENCES gboard (
			gbno
		);

ALTER TABLE request
	ADD
		CONSTRAINT FK_iboard_TO_request
		FOREIGN KEY (
			bno
		)
		REFERENCES iboard (
			bno
		);

ALTER TABLE request
	ADD
		CONSTRAINT FK_members_TO_request
		FOREIGN KEY (
			mno
		)
		REFERENCES members (
			mno
		);

ALTER TABLE recommend
	ADD
		CONSTRAINT FK_iboard_TO_recommend
		FOREIGN KEY (
			bno
		)
		REFERENCES iboard (
			bno
		);

ALTER TABLE recommend
	ADD
		CONSTRAINT FK_members_TO_recommend
		FOREIGN KEY (
			mno
		)
		REFERENCES members (
			mno
		);