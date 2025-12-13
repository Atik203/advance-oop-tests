package com.universities.research.service;

import com.universities.research.model.University;
import com.universities.research.repository.UniversityRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class UniversityService {
    private final UniversityRepository repository;

    public List<University> getAll() {
        return repository.findAll();
    }

    public Optional<University> getById(Long id) {
        return repository.findById(id);
    }

    public University create(University university) {
        return repository.save(university);
    }

    public University update(Long id, University university) {
        return repository.findById(id).map(existing -> {
            existing.setName(university.getName());
            existing.setLocation(university.getLocation());
            existing.setDescription(university.getDescription());
            existing.setFoundedYear(university.getFoundedYear());
            return repository.save(existing);
        }).orElseThrow(() -> new RuntimeException("University not found"));
    }

    public University partialUpdate(Long id, University university) {
        return repository.findById(id).map(existing -> {
            if (university.getName() != null) existing.setName(university.getName());
            if (university.getLocation() != null) existing.setLocation(university.getLocation());
            if (university.getDescription() != null) existing.setDescription(university.getDescription());
            if (university.getFoundedYear() != null) existing.setFoundedYear(university.getFoundedYear());
            return repository.save(existing);
        }).orElseThrow(() -> new RuntimeException("University not found"));
    }

    public void delete(Long id) {
        repository.deleteById(id);
    }
}
