package com.universities.research.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "universities")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class University {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, unique = true)
    private String name;

    @Column(nullable = false)
    private String location;

    @Column
    private String description;

    @Column
    private Integer foundedYear;
}
