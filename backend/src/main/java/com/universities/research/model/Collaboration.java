package com.universities.research.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.time.LocalDate;

@Entity
@Table(name = "collaborations")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Collaboration {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String title;

    @Column(columnDefinition = "TEXT")
    private String description;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "university_one_id", nullable = false)
    private University universityOne;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "university_two_id", nullable = false)
    private University universityTwo;

    @Column
    private LocalDate startDate;

    @Column
    private LocalDate endDate;

    @Column
    private String status;
}
