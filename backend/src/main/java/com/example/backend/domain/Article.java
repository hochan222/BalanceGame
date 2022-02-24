package com.example.backend.domain;

import java.util.HashSet;
import java.util.Set;
import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
@Entity
public class Article extends BaseTimeEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "article_category_id")
    private ArticleCategory articleCategory;

    @Column(length = 45, nullable = false)
    private String title;

    @Column(columnDefinition = "TINYTEXT", nullable = false)
    private String content;

    @Column(length = 100, nullable = false)
    private String leftItem;

    @Column(length = 100, nullable = false)
    private String rightItem;

    @Column(nullable = false)
    private Long leftCount;

    @Column(nullable = false)
    private Long rightCount;

    @Column(nullable = false)
    private Long totalCount;

    @Column(length = 8, nullable = false)
    private String password;

    @OneToMany(mappedBy = "article", cascade = CascadeType.REMOVE)
    private Set<ArticleComment> articleComments = new HashSet<>();

    @OneToMany(mappedBy = "article", cascade = CascadeType.REMOVE)
    private Set<VoteHistory> voteHistories = new HashSet<>();

    public Article(ArticleCategory articleCategory, String title, String content,
        String leftItem, String rightItem, String password) {
        this.articleCategory = articleCategory;
        this.title = title;
        this.content = content;
        this.leftItem = leftItem;
        this.rightItem = rightItem;
        this.leftCount = 0L;
        this.rightCount = 0L;
        this.totalCount = 0L;
        this.password = password;
    }
}
