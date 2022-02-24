-- EXCUTE THIS QUERY!!!!!!!!!! PLEASEEEEEEEEE~~~~!!!!!
insert into `article_category` (name) values("BackEnd");
insert into `article_category` (name) values("FrontEnd");
insert into `article_category` (name) values("DataAnalysis");
insert into `article_category` (name) values("AI");
insert into `article_category` (name) values("Job담");

-- article
insert into `article` (article_category_id, title, content, left_item, right_item, password) values (1, "자바랑 코틀린", "자바랑 코틀린 중에 뭐가 더 좋아? 나 스프링 하게", "kotlin", "java", "12345");
insert into `article` (article_category_id, title, content, left_item, right_item, password) values (2, "요즘 대세는?", "요즘 대세가 뭘까", "vue", "react", "2345");
insert into `article` (article_category_id, title, content, left_item, right_item, password) values (3, "", "다들 gRPC 해봤어? 러닝커브 크다던데 ㅠㅠ", "gRPC", "Spring", "1111");
insert into `article` (article_category_id, title, content, left_item, right_item, password) values (1, "김영한 vs 백기선", "강의 뭐가 더 좋아", "김영한", "백기선", "11112");
insert into `article` (article_category_id, title, content, left_item, right_item, password) values (1, "클라우드 뭐쓰지", "지금 이런 상황이야. 클라우드 어떤거 쓸까", "google", "aws", "12325");
insert into `article` (article_category_id, title, content, left_item, right_item, password) values (2, "프엔 교재", "나 교재 추천좀.", "바로 적용하는 react", "react 이보다 쉬울 순 없다", "1112345");
insert into `article` (article_category_id, title, content, left_item, right_item, password) values (2, "입문 뭐부터해", "제목 그대로", "css", "html", "1111345");
insert into `article` (article_category_id, title, content, left_item, right_item, password) values (2, "프엔 짱은 누구?", "프엔 짱 누구라 생각해", "이호찬", "박찬우", "12345");
insert into `article` (article_category_id, title, content, left_item, right_item, password) values (2, "자스랑 타스", "JavaScript vs TypeScript", "js", "ts", "12345");
insert into `article` (article_category_id, title, content, left_item, right_item, password) values (3, "데이터 분석 짱?", "데이터 분석 짱이라고 생각해?", "짱", "아니", "12345");
insert into `article` (article_category_id, title, content, left_item, right_item, password) values (3, "데이터 분석 짱?", "데이터 분석 짱이라고 생각해?", "짱", "아니", "12345");
insert into `article` (article_category_id, title, content, left_item, right_item, password) values (3, "데이터 분석 짱?", "데이터 분석 짱이라고 생각해?", "짱", "아니", "12345");
insert into `article` (article_category_id, title, content, left_item, right_item, password) values (3, "데이터 분석 짱?", "데이터 분석 짱이라고 생각해?", "짱", "아니", "12345");
insert into `article` (article_category_id, title, content, left_item, right_item, password) values (3, "데이터 분석 짱?", "데이터 분석 짱이라고 생각해?", "짱", "아니", "12345");
insert into `article` (article_category_id, title, content, left_item, right_item, password) values (3, "데이터 분석 짱?", "데이터 분석 짱이라고 생각해?", "짱", "아니", "12345");
insert into `article` (article_category_id, title, content, left_item, right_item, password) values (3, "데이터 분석 짱?", "데이터 분석 짱이라고 생각해?", "짱", "아니", "12345");
insert into `article` (article_category_id, title, content, left_item, right_item, password) values (3, "데이터 분석 짱?", "데이터 분석 짱이라고 생각해?", "짱", "아니", "12345");
insert into `article` (article_category_id, title, content, left_item, right_item, password) values (3, "데이터 분석 짱?", "데이터 분석 짱이라고 생각해?", "짱", "아니", "12345");
insert into `article` (article_category_id, title, content, left_item, right_item, password) values (3, "데이터 분석 짱?", "데이터 분석 짱이라고 생각해?", "짱", "아니", "12345");
insert into `article` (article_category_id, title, content, left_item, right_item, password) values (3, "데이터 분석 짱?", "데이터 분석 짱이라고 생각해?", "짱", "아니", "12345");
insert into `article` (article_category_id, title, content, left_item, right_item, password) values (3, "데이터 분석 짱?", "데이터 분석 짱이라고 생각해?", "짱", "아니", "12345");
insert into `article` (article_category_id, title, content, left_item, right_item, password) values (3, "데이터 분석 짱?", "데이터 분석 짱이라고 생각해?", "짱", "아니", "12345");
insert into `article` (article_category_id, title, content, left_item, right_item, password) values (3, "데이터 분석 짱?", "데이터 분석 짱이라고 생각해?", "짱", "아니", "12345");
insert into `article` (article_category_id, title, content, left_item, right_item, password) values (3, "데이터 분석 짱?", "데이터 분석 짱이라고 생각해?", "짱", "아니", "12345");
insert into `article` (article_category_id, title, content, left_item, right_item, password) values (3, "데이터 분석 짱?", "데이터 분석 짱이라고 생각해?", "짱", "아니", "12345");
insert into `article` (article_category_id, title, content, left_item, right_item, password) values (3, "데이터 분석 짱?", "데이터 분석 짱이라고 생각해?", "짱", "아니", "12345");
---


-- articleComment
insert into `article_comment` (article_id, password, content) values(1, "12345", "자바용!");
insert into `article_comment` (article_id, password, content) values(1, "122345", "코틀린짱!");
insert into `article_comment` (article_id, password, content) values(1, "1234521", "자바!");
insert into `article_comment` (article_id, password, content) values(1, "123453", "코틀린!");
insert into `article_comment` (article_id, password, content) values(1, "123452", "코!");
insert into `article_comment` (article_id, password, content) values(1, "123459", "java~~!!!!! PLEASE DON\'t SAY KOTLIN!");
insert into `article_comment` (article_id, password, content) values(1, "123458", "자바용!@@@@@!!!!😄");
insert into `article_comment` (article_id, password, content) values(1, "12345a", "코프링이.... 요즘 대세... 코틀린짱...");
insert into `article_comment` (article_id, password, content) values(1, "123454", "자바라고~ java... JAVA");
insert into `article_comment` (article_id, password, content) values(1, "12345b", "HEY~ KOTLYN IS THE BEST!!!!!!");
insert into `article_comment` (article_id, password, content) values(1, "12345b", "NO~ JAVA IS THE BEST!!!!!! GO AWAY, KOTLIN!!!!!");
insert into `article_comment` (article_id, password, content) values(1, "12345b", "JAVAGA JJANG👍 EDA");
insert into `article_comment` (article_id, password, content) values(1, "12345b", "자~!~!~!바~!~!~!");
---
insert into `article_comment` (article_id, password, content) values(2, "12345d", "vue에 한 표");
insert into `article_comment` (article_id, password, content) values(2, "12345f", "vue에 두 표");
insert into `article_comment` (article_id, password, content) values(2, "123457", "react에 한 표");
insert into `article_comment` (article_id, password, content) values(2, "123426", "react!!!!!");
insert into `article_comment` (article_id, password, content) values(2, "123455", "야~~ 자식덜아~~~ vue가 짱이여~");
insert into `article_comment` (article_id, password, content) values(2, "12312", "react..");
insert into `article_comment` (article_id, password, content) values(2, "1234005", "react~! 얘가 1위임");
insert into `article_comment` (article_id, password, content) values(2, "12345sdf", "vue... !!@!@");
insert into `article_comment` (article_id, password, content) values(2, "12345s", "vue나 react나 아무거나 써라...");
