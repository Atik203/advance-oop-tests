package com.universities.research.repository;

import com.universities.research.model.ResearchPaper;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ResearchPaperRepository extends JpaRepository<ResearchPaper, Long> {
}
