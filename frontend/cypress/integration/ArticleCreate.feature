Feature: Overloop Article Tests

    I want to successfully test the article feature

    Scenario: Should create an article
        Given The db has been cleared
        When I visit the articles page
        And I click on create article button
        And Article has title 'My awesome article'
        And Article has content 'Lorem Ipsum donor whatever'
        And Article includes region 'Australia'
        And Article includes region 'United Kingdom'
        And I save the article
        Then I am navigated to '/articles/list' page

    Scenario: Should check the created article's contents
        When I visit the articles page
        When I click on my last created article
        Then Article should have correct title
        And Article should have correct content
        And Article should have correct regions

    Scenario: Should check all articles have been listed
        When I visit the articles page
        And I create a random article
        Then The article list has been requested
        And All articles have been listed




