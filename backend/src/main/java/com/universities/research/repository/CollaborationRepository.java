package com.universities.research.repository;

import com.universities.research.model.Collaboration;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CollaborationRepository extends JpaRepository<Collaboration, Long> {
}
