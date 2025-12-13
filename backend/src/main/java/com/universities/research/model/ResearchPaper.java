package com.universities.research.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "research_papers")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class ResearchPaper {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String title;

    @Column(columnDefinition = "TEXT")
    private String abstractText;

    @Column(nullable = false)
    private String authors;

    @Column
    private Integer publicationYear;

    @Column
    private String journal;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "university_id")
    private University university;
}
