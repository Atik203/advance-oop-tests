package com.universities.research.service;

import com.universities.research.model.ResearchPaper;
import com.universities.research.repository.ResearchPaperRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class ResearchPaperService {
    private final ResearchPaperRepository repository;

    public List<ResearchPaper> getAll() {
        return repository.findAll();
    }

    public Optional<ResearchPaper> getById(Long id) {
        return repository.findById(id);
    }

    public ResearchPaper create(ResearchPaper paper) {
        return repository.save(paper);
    }

    public ResearchPaper update(Long id, ResearchPaper paper) {
        return repository.findById(id).map(existing -> {
            existing.setTitle(paper.getTitle());
            existing.setAbstractText(paper.getAbstractText());
            existing.setAuthors(paper.getAuthors());
            existing.setPublicationYear(paper.getPublicationYear());
            existing.setJournal(paper.getJournal());
            existing.setUniversity(paper.getUniversity());
            return repository.save(existing);
        }).orElseThrow(() -> new RuntimeException("Research paper not found"));
    }

    public ResearchPaper partialUpdate(Long id, ResearchPaper paper) {
        return repository.findById(id).map(existing -> {
            if (paper.getTitle() != null) existing.setTitle(paper.getTitle());
            if (paper.getAbstractText() != null) existing.setAbstractText(paper.getAbstractText());
            if (paper.getAuthors() != null) existing.setAuthors(paper.getAuthors());
            if (paper.getPublicationYear() != null) existing.setPublicationYear(paper.getPublicationYear());
            if (paper.getJournal() != null) existing.setJournal(paper.getJournal());
            if (paper.getUniversity() != null) existing.setUniversity(paper.getUniversity());
            return repository.save(existing);
        }).orElseThrow(() -> new RuntimeException("Research paper not found"));
    }

    public void delete(Long id) {
        repository.deleteById(id);
    }
}
