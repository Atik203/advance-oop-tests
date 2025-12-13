package com.universities.research.service;

import com.universities.research.model.Collaboration;
import com.universities.research.repository.CollaborationRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class CollaborationService {
    private final CollaborationRepository repository;

    public List<Collaboration> getAll() {
        return repository.findAll();
    }

    public Optional<Collaboration> getById(Long id) {
        return repository.findById(id);
    }

    public Collaboration create(Collaboration collaboration) {
        return repository.save(collaboration);
    }

    public Collaboration update(Long id, Collaboration collaboration) {
        return repository.findById(id).map(existing -> {
            existing.setTitle(collaboration.getTitle());
            existing.setDescription(collaboration.getDescription());
            existing.setUniversityOne(collaboration.getUniversityOne());
            existing.setUniversityTwo(collaboration.getUniversityTwo());
            existing.setStartDate(collaboration.getStartDate());
            existing.setEndDate(collaboration.getEndDate());
            existing.setStatus(collaboration.getStatus());
            return repository.save(existing);
        }).orElseThrow(() -> new RuntimeException("Collaboration not found"));
    }

    public Collaboration partialUpdate(Long id, Collaboration collaboration) {
        return repository.findById(id).map(existing -> {
            if (collaboration.getTitle() != null) existing.setTitle(collaboration.getTitle());
            if (collaboration.getDescription() != null) existing.setDescription(collaboration.getDescription());
            if (collaboration.getUniversityOne() != null) existing.setUniversityOne(collaboration.getUniversityOne());
            if (collaboration.getUniversityTwo() != null) existing.setUniversityTwo(collaboration.getUniversityTwo());
            if (collaboration.getStartDate() != null) existing.setStartDate(collaboration.getStartDate());
            if (collaboration.getEndDate() != null) existing.setEndDate(collaboration.getEndDate());
            if (collaboration.getStatus() != null) existing.setStatus(collaboration.getStatus());
            return repository.save(existing);
        }).orElseThrow(() -> new RuntimeException("Collaboration not found"));
    }

    public void delete(Long id) {
        repository.deleteById(id);
    }
}
