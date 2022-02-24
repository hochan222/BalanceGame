package com.example.backend.domain;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
@Entity
public class ArticleComment extends BaseTimeEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @JoinColumn(name = "article_id")
    @ManyToOne
    private Article article;

    @Column(length = 8, nullable = false)
    private String password;

    @Column(columnDefinition = "TINYTEXT", nullable = false)
    private String content;

    public ArticleComment(Article article, String password, String content) {
        this.article = article;
        this.password = password;
        this.content = content;
    }

    public void updateArticleComment(String content) {
        this.content = content;
    }
}
